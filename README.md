# Custom styles for Neos CMS CKEditor

A Neos CMS plugin that allows you to apply your own stylesheets to text.

## Installation

Just run:

```
composer require neosrulez/neos-ckeditor-customstyles
```

## Configuration

### Presets
```yaml
NeosRulez:
  Neos:
    CkEditor:
      CustomStyles:
        presets:
          textColor:
            label: Text color
            options:
              primary:
                label: Primary
                cssClasses: 'text-primary'
                preview: '/_Resources/Static/Packages/Acme.Package/primary-color.png'
              secondary:
                label: Secondary
                cssClasses: 'text-primary'
                backgroundColor: '#0a58ca'
                textColor: '#FFFFFF'
              success:
                label: Success
                cssClasses: 'text-success'
```

### DataSource
```yaml
NeosRulez:
  Neos:
    CkEditor:
      CustomStyles:
        dataSource:
          label: Font Awesome
          dataSourceIdentifier: neosrulez-bootstrap-fa
```

## Usage

```yaml
'Neos.NodeTypes:Text':
  properties:
    text:
      ui:
        inline:
          editorOptions:
            customStyles:
              textColor: true
```

## Author

* E-Mail: mail@patriceckhart.com
* URL: http://www.patriceckhart.com 
