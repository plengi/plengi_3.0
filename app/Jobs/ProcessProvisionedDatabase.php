<?php

namespace App\Jobs;

use DB;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessProvisionedDatabase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $empresa;
	public $connectionName = '';

    /**
     * Create a new job instance.
     */
    public function __construct($empresa)
    {
        $this->empresa = $empresa;
		$this->connectionName = 'plengi';
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
			$this->createDatabase($this->empresa->token_db);
			if (!config('database.connections.' . $this->connectionName)) {
				$this->copyDBConnection($this->connectionName, $this->empresa->token_db);
			}

			$this->setDBInConnection($this->connectionName, $this->empresa->token_db);

			Artisan::call('migrate', [
				'--force' => true,
				'--path' => 'database/migrations/sistema',
				'--database' => $this->connectionName
			]);
			
		} catch (Exception $exception) {
			Log::error('Error al generar base de datos provisionada', ['message' => $exception->getMessage()]);

			$this->dropDb($this->empresa->token_db);
		}
    }

    function createDatabase(string $database)
	{
		return DB::statement("CREATE DATABASE IF NOT EXISTS $database");
	}

    function copyDBConnection($copyFromConnection, $newConnectionName)
	{
		config([
			"database.connections.$newConnectionName" => config("database.connections.$copyFromConnection"),
		]);
	}

    function setDBInConnection($connection, $database)
	{
		config([
			"database.connections.$connection.database" => $database,
		]);

		\DB::purge($connection);
	}

    private function dropDb($schemaName)
	{
		if (config('database.connections.' . $this->connectionName)) {
			DB::connection($this->connectionName)->statement("DROP DATABASE IF EXISTS $schemaName");
		}
	}
}
