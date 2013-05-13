## status-site
A minimal but good looking status site for an arbitrary collection of services.
Designed to be easy to update and simple to deploy.

Example site using Github Pages: [http://danielbeardsley.github.io/status-site/](http://danielbeardsley.github.io/status-site/)

Can be hosted by any file-serving http server: Apache, nginx, even S3 / Cloudfront

Provides a tool that allows easy posting of notices and availability information
for a collection of services (or just edit a json file).

### Get Started

    $ git clone git://github.com/danielbeardsley/status-site.git
    $ cd status-site
    $ cp notices.json.example notices.json
    # # Serve the files via any http server
    $ python -m SimpleHTTPServer

### Features

 * Completely static; Serve the site from any host anywhere.
 * Easy to update using `bin/add-notice`.
 * Automatically checks for new notices every 30 seconds.
 * Simple design looks great on smaller screens.
 * JSON endpoint can be `curl`ed from anywhere.
