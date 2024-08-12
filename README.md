# Custom styles for Neos CMS CKEditor

A Neos CMS plugin that allows you to apply your own stylesheets to text.

## Installation

Just run:

```
composer require neosrulez/neos-ckeditor-customstyles
```

## Configuration

```yaml
NeosRulez:
  Neos:
    CkEditor:
      CustomStyles:
        presets:
          fontAwesomeIcon:
            label: Font Awesome
            dataSourceIdentifier: neosrulez-bootstrap-fa
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

## Usage

```yaml
'Neos.NodeTypes:Text':
  properties:
    text:
      ui:
        inline:
          editorOptions:
            customStyles:
              fontAwesomeIcon: true
              textColor: true
```

## Author

* E-Mail: mail@patriceckhart.com
* URL: http://www.patriceckhart.com 
