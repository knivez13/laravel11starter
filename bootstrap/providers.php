<?php

return [
    //Package Service Providers
    Spatie\Permission\PermissionServiceProvider::class,
    OwenIt\Auditing\AuditingServiceProvider::class,
    \ESolution\DBEncryption\Providers\DBEncryptionServiceProvider::class,

    //Application Service Providers
    App\Providers\AppServiceProvider::class,
];
