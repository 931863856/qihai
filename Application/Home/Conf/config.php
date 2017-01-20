<?php
return array(
	'APP_DEBUG' => true,
	//'LAYOUT_ON' => true,
	//'LAYOUT_NAME' => 'Layout/default',
	'TMPL_PARSE_STRING' => array(
		'__CSS__' => __ROOT__ . '/Public/' . MODULE_NAME . '/css',
		'__JS__' => __ROOT__ . '/Public/' . MODULE_NAME . '/js',
		'__IMG__' => __ROOT__ . '/Public/' . MODULE_NAME . '/img',
		'__FONT__' => __ROOT__ . '/Public/' . MODULE_NAME . '/font'
	),

    'DEFAULT_THEME'     => 'default',
    'THEME_LIST'        => 'default,mobile',

    'LANG_SWITCH_ON'    => true,
    'LANG_AUTO_DETECT'  => true,
    'LANG_LIST'         => 'zh-cn,en-us',
    'TMPL_DETECT_THEME' => true,

    'API_URL' => 'http://qihai.saas.siteilex.com/api/web/v2/index.php?route='
);