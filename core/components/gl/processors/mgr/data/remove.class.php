<?php

/**
 * Remove a glData
 */
class modglDataRemoveProcessor extends modObjectRemoveProcessor
{
	public $classKey = 'glData';
	public $languageTopics = array('gl');
	public $permission = '';

	/** {@inheritDoc} */
	public function beforeRemove()
	{
		if ($this->object->get('default')) {
			return $this->modx->lexicon('gl_err_lock');
		}
		return parent::beforeRemove();
	}

}

return 'modglDataRemoveProcessor';