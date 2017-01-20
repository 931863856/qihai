<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index() {
        $index_slider = $_GET['index_slider'];
        if ($index_slider) {
            $this->assign('index_slider', $index_slider);
        } else {
            $this->assign('index_slider', null);
        }

        if (LANG_SET == 'zh-cn') {
            $this->assign('url_change_lang', U('index?l=en-us'));
        } else {
            $this->assign('url_change_lang', U('index?l=zh-cn'));
        }

        $info = $this->httpGetJson(C('API_URL') . 'setting/setting/info');
        $this->assign('company_name', $info['config_name_1']);

        $banner = $this->httpGetJson(C('API_URL') . 'module/banner/list&code=index-banner');
        $this->assign('banner', $banner);

        $this->display();
    }

    public function opinion() {
        $opinion_0 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=4');
        $opinion_1 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=5');
        $opinion_2 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=6');
        $opinion_3 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=7');
        
        $this->assign('opinion_0', $opinion_0);
        $this->assign('opinion_1', $opinion_
            );
        $this->assign('opinion_2', $opinion_2);
        $this->assign('opinion_3', $opinion_3);        
        $this->display();
    }

    public function opinion_detail() {
        $idx = $_GET['idx'];
        // TODO AJAX
        $opinion_0 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=4');
        $opinion_1 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=5');
        $opinion_2 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=6');
        $opinion_3 = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=7');
        
        $this->assign('idx', $idx);

        $this->assign('opinion_0', $opinion_0);
        $this->assign('opinion_1', $opinion_1);
        $this->assign('opinion_2', $opinion_2);
        $this->assign('opinion_3', $opinion_3);
        
        $this->display();
    }

    public function about() {
        $data = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=1');
        $data_detail = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=3');
        $this->assign('data', $data);
        $this->assign('data_detail', $data_detail);
        
    	$this->display();
    }

    public function team() {
        $brief = $this->httpGetJson(C('API_URL') . 'information/information/detail&id=8');
        $data = $this->httpGetJson(C('API_URL') . 'information/information/list&code=team');
        $this->assign('brief', $brief);
        $this->assign('data', $data);
        
        $this->display();
    }

    public function portfolio() {
        $data = $this->httpGetJson(C('API_URL') . 'catalog/product/list&pagenum=1&pagesize=100');
        $products = array();
        foreach ($data as $vo) {
            $vo['description'] = html_entity_decode($vo['description'], ENT_QUOTES, 'UTF-8');
            $products[] = $vo;
        }
        $this->assign('data', $products);
        
        $this->display();
    }

    public function conference() {
        $videos = $this->httpGetJson(C('API_URL') . 'catalog/video/list&sort=sort_order&order=ASC');

        $data = array();

        foreach ($videos as $video) {
            $data[] = $video['description'];
        }
        $this->assign('data', $data);

        if (LANG_SET == 'en-us') {
            $this->display('conference_en');
        } else {
            $this->display();
        }
    }

    public function get_video() {
        $videos = $this->httpGetJson(C('API_URL') . 'catalog/video/list');
        $results = array();
        foreach ($videos as $video) {
            $results[] = preg_replace('(<p>)|(</p>)', '', $video['description']);
        }

        $this->ajaxReturn($results, NULL, 1);
    }

    public function news() {
        $company_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=3&filter_article_category_id=1');
        $industry_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=6&filter_article_category_id=2');
        $this->assign('company_news', $company_news);
        $this->assign('industry_news', $industry_news);
        
        $this->display();
    }

    public function news_detail() {
        $id = $_GET['id'];
        $data = $this->httpGetJson(C('API_URL') . 'catalog/article/detail&id=' . $id);
        $data['description'] = html_entity_decode($data['description'], ENT_QUOTES, 'UTF-8');
        $this->assign('data', $data);

        $industry_news = $this->httpGetJson(C('API_URL') . 'catalog/article/list&pagenum=1&pagesize=6&filter_article_category_id=2');
        $this->assign('industry_news', $industry_news);
        
        $this->display();
    }

    public function contact() {
        if (IS_POST) {
            if (!$_POST['email'] || !$_POST['name'] || !$_POST['subject'] || !$_POST['content']) {
                $this->assign('error', L('ERR_EMPTY'));
            } else {
                $data = $this->httpPost(C('API_URL') . 'information/feedback/submit', array(
                    'name' => $_POST['name'],
                    'email' => $_POST['email'],
                    'enquiry' => $_POST['subject'] . ' - ' . $_POST['content']));
                $this->assign('success', L('SUCCESS'));
            }
        }

        $info = $this->httpGetJson(C('API_URL') . 'setting/setting/info');

        if (LANG_SET == 'en-us') {
            $lang_id = 2;
        } else {
            $lang_id = 1;
        }

        if ($info && isset($info['config_address_' . $lang_id])) {
            $addr_arr = explode('##', $info['config_address_' . $lang_id]);
            $this->assign('addresses', $addr_arr);
        }

        $this->assign('company_email', $info['config_email']);

        $this->display();
    }

    private function httpGetJson($url) {
        if (LANG_SET == 'en-us') {
            $url .= '&language=en';
        } else {
            $url .= '&language=zh';
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result = curl_exec($ch);
        curl_close($ch);
        $arr = json_decode($result, ture);
        if ($arr['code'] == '0x0000') {
            return $arr['result'];
        } else {
            return array();
        }
    }

    private function httpPost($url, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        $result = curl_exec($ch);
        curl_close($ch);
        $arr = json_decode($result, ture);
        if ($arr['code'] == '0x0000') {
            return $arr['result'];
        } else {
            return array();
        }
    }
}