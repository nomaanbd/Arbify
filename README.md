<div align="center">
<h1>Arbify</h1>
    
[![PHP workflow][php-workflow-badge]][php-workflow]

**Arbify is currently abandoned. Features that are already present should work without a problem, but no further support or development will be made here, at least for some time. Feel free to fork it!**

</div>

![Screenshot](resources/images/screenshot.png)

ARB files localization tool. Dedicated to [Flutter](https://flutter.dev) and its [intl](https://pub.dev/packages/intl) package.

## Installation

Firstly, copy the `.env.example` file to `.env` and fill it with the correct configuration for some of the services.

```bash
cp .env.example .env
nano .env # or vim or whatever you like :)
```

Commented lines are irrelevant, or you most probably shouldn't care about them. You may want to set `MAIL_*` variables
to use a proper SMTP server. Arbify logs the emails instead of sending them by default.

### Deploying

```bash
docker-compose build arbify
docker-compose up -d
docker-compose run --rm arbify docker/arbify/upgrade.sh
```

The `build` step and running the `upgrade.sh` script is required only after installing or updating the Arbify. You don't need to run it everytime.

After this you're ready to go to [http://localhost:8000](http://localhost:8000) and check out Arbify yourself!

The database is seeded with a pre-verified super administrator account `admin` with password `password`.

[php-workflow]: https://github.com/Arbify/Arbify/actions?query=workflow%3APHP
[php-workflow-badge]: https://img.shields.io/github/workflow/status/Arbify/Arbify/PHP

### Deploying on sub directory (Apache)

Firstly, copy the `.env.example` file to `.env` and fill it with the correct configuration and change APP_DIR to your desired project sub directory.

```bash
cp .env.example .env
nano .env # or vim or whatever you like :)
```

Then change `subdir` value to your desired project sub directory name in the following file

```
\resources\js\messages-app\urls.js
```

-   Install Composer

To install Composer, run the following command:

```bash
curl -sS https://getcomposer.org/installer | php
```

After that, copy the downloaded binary to the system directory.

```bash
sudo mv composer.phar /usr/local/bin/composer
```

Clone project into sub directory and run these commands

```bash
composer install --no-dev
```

We use the –no-dev flag to install only the dependencies that are required in production.

-   Laravel Permissions

In order to run, Apache needs certain permissions over the Laravel directory we made. We must first give our web group control of the Laravel directory. You can read more on Linux file permissions here.

```bash
sudo chown -R www-data:www-data /var/www/html/laravel

sudo chmod -R 775 /var/www/html/laravel

sudo chmod -R 775 /var/www/html/laravel/storage

sudo chmod -R 775 /var/www/html/laravel/bootstrap/cache
```

-   Generate config & resources

To generate key, cache config and migrate database run following commands:

```bash
php artisan key:generate
php artisan config:cache
php artisan migrate
```

To generate resource files (css, js) in public folder:

```bash
npm install
npm run dev

```

### Apache Configuration

-   Open Apache configuration file on

```bash
/etc/apache2/sites-available/000-default.conf
```

Now add in the configuration file like this:

```apache
DocumentRoot /var/www/html
Alias /project1 /var/www/html/project1/public
Alias /project2 /var/www/html/project2/public
<Directory /var/www/html/project1>
   AllowOverride All
</Directory>
<Directory /var/www/html/project2>
   AllowOverride All
</Directory>
```

Then, reload the Apache service to apply the changes:

```bash
sudo systemctl restart apache2
```

Last, edit file .htaccess on public folder for each laravel project with adding this script

```apache
RewriteBase /project1/
# Based on your folder project name
```

**OPTION 2: Redirect all the request using .htdocs!**

First of all, create a .htaccess file in root folder of your Laravel app, this file will redirect all request to the public folder of your app, this comes out of the box if you use valet or artisan serve.

```apache
<IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```
