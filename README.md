## status-site
A minimal but good looking status site for a collection of services.
Designed to be easy to update and simple to deploy.

Can be hosted be any file-serving http server: Apache, nginx, even S3 / Cloudfront

Allows easy posting of notices and availability information
for a collection of services (just edit a json file).

### Get Started

    $ git clone git://github.com/danielbeardsley/status-site.git
    $ cd status-site
    $ cp notices.json.example notices.json
    # # Serve the files via any http server
    $ python -m SimpleHTTPServer

### Features

 * Completely static. Serve the site from any host anywhere.
 * Easy to update: `bin/add-notice`
 * Automatically checks for new notices every 30 seconds.
 * Responsive design looks great on smaller screens.
