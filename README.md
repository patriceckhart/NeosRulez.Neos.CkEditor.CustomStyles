# Custom styles for Neos CMS CKEditor

A Neos CMS plugin that allows you to apply your own style sheets to text.

## Installation

The NeosRulez.Neos.CkEditor.CustomStyles package is listed on packagist (https://packagist.org/packages/neosrulez/neos-ckeditor-customstyles) - therefore you don't have to include the package in your "repositories" entry any more.

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
              textColor: true
```

## Author

* E-Mail: mail@patriceckhart.com
* URL: http://www.patriceckhart.com 
