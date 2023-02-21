<?php

namespace Impactasolucoes\Crud\Helpers;

class Helpers {

    /**
     * Remove / do inicio e do fim de uma string
     * @param string $string
     * @return string
     */
    static function unbackSlash(string $string): string
    {
        $string = ($string[0] === "/" ? mb_substr($string, 1) : $string);
        $lastIndex = mb_strlen($string) - 1;
        $string = mb_strrpos($string, '/') === $lastIndex
            ? mb_strrchr($string, '/', true)
            : $string;
        return $string;
    }

    /**
     * Trata a string do label de busca avançada em caso de relacionamentos,
     * removendo os pontos e deixando apenas o útimo item
     * @param $label
     * @return mixed|string $string
     */
    static function listingRelationLabel($label)
    {
        $array = explode('.', $label);
        if (count($array) > 1) {
            $label = end($array);
        }
        return $label;
    }

    /**
     * Search for specific parameter inside a querystring
     * @param $request
     * @param array $ignoreList
     * @return string
     */
    static function getQueryString($request, $ignoreList = [])
    {
        parse_str($request->getQueryString(), $queryArray);
        foreach ($ignoreList as $ignoreItem) {
            if (array_key_exists($ignoreItem, $queryArray)) {
                unset($queryArray[$ignoreItem]);
            }
        }
        return http_build_query($queryArray);
    }

    /**
     * Search defined parameter in request
     * @param string $parameter
     * @return bool|string
     */
    static function getParameterFromRequest($request, string $parameter)
    {
        // Search 'parameter' in request
        if ($request->has($parameter)) {
            return urldecode($request->get($parameter));
        }

        // Search 'parameter' in json
        if ($request->json()->has($parameter)) {
            return urldecode($request->json()->get($parameter));
        }

        return false;
    }

    /**
     * Clear querystring form URL
     * @param $url
     * @return string
     */
    static function clearUrl($url)
    {

        if (strpos($url, "?") !== false) {
            return substr($url, 0, strpos($url, "?"));
        }
        return $url;
    }

    /**
     * Converte uma string snake_case para CamelCase
     *
     * @param string $input
     * @param string $separator
     * @return string|string[]
     */
    static function camelize(string $input, string $separator = '_')
    {
        return str_replace($separator, '', ucwords($input, $separator));
    }

}
