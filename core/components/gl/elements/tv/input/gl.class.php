<?php
if(!class_exists('GeoLocationInputRender')) {
	class GeoLocationInputRender extends modTemplateVarInputRender {
		public function getTemplate() {
			return $this->modx->getOption('core_path').'/components/gl/elements/tv/input/tpl/gl.tpl';
		}
		public function process($value,array $params = array()) {
		}
	}
}
return 'GeoLocationInputRender';