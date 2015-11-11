<?php

/**
 * Update an glCountry
 */
class modglCountryUpdateProcessor extends modObjectUpdateProcessor
{
	public $objectType = 'glCountry';
	public $classKey = 'glCountry';
	public $languageTopics = array('gl');
	public $permission = '';


	/** {@inheritDoc} */
	public function beforeSave()
	{
		if (!$this->checkPermissions()) {
			return $this->modx->lexicon('access_denied');
		}

		return true;
	}

	/** {@inheritDoc} */
	public function beforeSet()
	{
		$id = (int)$this->getProperty('id');
		if (empty($id)) {
			return $this->modx->lexicon('gl_err_ns');
		}

		$host = trim($this->getProperty('host'));
		if (empty($host)) {
			$this->modx->error->addField('host', $this->modx->lexicon('gl_err_ae'));
		}

		if ($this->modx->getCount($this->classKey, array(
			'host' => $host,
			'id:!=' => $id
		))
		) {
			$this->modx->error->addField('host', $this->modx->lexicon('gl_err_ae'));
		}

		return parent::beforeSet();
	}
}

return 'modglCountryUpdateProcessor';
