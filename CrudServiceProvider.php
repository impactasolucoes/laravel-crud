<?php

namespace Impactasolucoes\Crud;

use Illuminate\Support\ServiceProvider as LaravelServiceProvider;

class CrudServiceProvider extends LaravelServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->bootForm();
        $this->bootListing();

        if ($this->app->runningInConsole()) {
            $this->commands([
                // Commands\CrudCreate::class,
                // Commands\CrudCustomController::class,
                // Commands\CrudCustomRequest::class,
                // Commands\CrudForm::class
            ]);
        }

        // Publish Views
        $this->publishes([
            __DIR__ . '/Listing/Resources/views' => resource_path('views/vendor/impactasolucoes/laravel-crud/listing'),
            __DIR__ . '/Form/Resources/views' => resource_path('views/vendor/impactasolucoes/laravel-crud/form'),
        ], 'views');

        // Publish Lang
        $this->publishes([
            __DIR__ . '/Listing/Resources/lang' => resource_path('lang/vendor/impactasolucoes/laravel-crud/listing'),
            __DIR__ . '/Form/Resources/lang' => resource_path('lang/vendor/impactasolucoes/laravel-crud/form'),
        ], 'views');
    }

    /**
     * Form maker Boot
     */
    public function bootForm()
    {
        // Default configs
        // It can be replaced by the user in laravel /config/form.php file
        $this->mergeConfigFrom(__DIR__ . '/Configs/form.php', 'form');
        $this->mergeConfigFrom(__DIR__.'/Configs/crud_eav.php', 'crud_eav');

        // Form Views
        $this->loadViewsFrom(__DIR__ . '/Form/Resources/views', 'form');

        // Lang
        $this->loadTranslationsFrom(__DIR__ . '/Form/Resources/lang', 'form');
    }

    /**
     * Listing boot
     */
    public function bootListing()
    {
        // Default configs
        // It can be replaced by the user in laravel /config/form.php file
        $this->mergeConfigFrom(__DIR__ . '/Configs/listing.php', 'listing');

        // Translations
        $this->loadTranslationsFrom(__DIR__ . '/Listing/Resources/lang', 'listing');

        // listing Views
        $this->loadViewsFrom(__DIR__ . '/Listing/Resources/views', 'listing');
    }
}
