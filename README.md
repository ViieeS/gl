## Select location(city/region/country) for [NewsPuplisher](http://modx.com/extras/package/newspublisher) (MODx Revolution)
1. Create `gl.php` file in `/core/components/newspublisher/tvs/` with following content:

	```php
	<?php
	$formTpl .= $this->_displaySimple($name,
		'GeoLocationTpl', $this->textMaxlength);
	```

2. Create `npGeoLocationTpl` chunk with following content:

	```
	[[!gl.modal?
		&class=`glCity`
		&tpl=`tpl.gl.input`
		&frontendJs=`[[+assetsUrl]]js/web/custom.js`
		&frontendCss=`[[+assetsUrl]]css/web/custom.css`
	]]
	```

## GL - Geo Location (MODx Revolution)

```
<p>
    Ваш город:
    <span class="gl-current-select">[[!+gl.current.city.name_ru]]</span>
</p>

[[!gl.modal?
	&class=`glCity`
]]

<h5>Реальное местоположение</h5>
<code>
[[!+gl.real.city.name_ru]]<br>
[[!+gl.real.region.name_ru]]<br>
[[!+gl.real.country.name_ru]]<br>  
</code>


<h5>Выбранное местоположение</h5>
<code>
[[!+gl.current.city.name_ru]]<br>
[[!+gl.current.region.name_ru]]<br>
[[!+gl.current.country.name_ru]]<br>
</code>

<h5>Контакты</h5>
<code>
phone: [[!+gl.current.data.phone]]<br>
email: [[!+gl.current.data.email]]<br>
</code>
```
