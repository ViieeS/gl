<?php

class modglIdentifierGetListProcessor extends modObjectProcessor
{
	public $classKey = '';

	/** {@inheritDoc} */
	public function process()
	{
		$element = $this->getProperty('class', 'glCountry');

		switch ($element) {
			case 'glCountry':
				$element = 'country';
				break;
			case 'glRegion':
				$element = 'region';
				break;
			default:
			case 'glCity':
				$element = 'city';
				break;

		}

		$id = $this->getProperty('id');
		$query = $this->getProperty('query');

		if (!$response = $this->modx->runProcessor('getlist',
			array(
				'combo' => true,
				'id' => $id,
				'query' => $query,

				'start' => $this->getProperty('start', 0),
				'limit' => $this->getProperty('limit', 20),
			),
			array('processors_path' => dirname(dirname(dirname(__FILE__))) . '/' . $element . '/')
		)
		) {
			$this->modx->log(1, print_r('[gl]:Error get element -  ' . $element, 1));
			return $this->failure('');
		}

		return $response->getResponse();
	}
}

return 'modglIdentifierGetListProcessor';