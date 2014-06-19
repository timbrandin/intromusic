Package.describe({
  summary: "Traitify API Wrapper for meteor"
});

Npm.depends({"traitify": "1.1.0"});

Package.on_use(function (api, where) {
  if (api.export) api.export('Traitify', 'server');
  api.add_files('traitify.js', 'server');
});
