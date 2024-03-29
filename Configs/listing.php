<?php

return [

    /**
     * View padrão a ser utilizada:
     * <String>
     */
    'view' => 'listing::listing',

    /**
     * Paginação: quantidade padrão de itens por página:
     * <Int>
     */
    'defaultPerPage' => 20,

    /**
     * Ações padrão da listagem:
     */
    'defaultActions' => [
        [
            'name' => 'create',
            'label' => 'Novo',
            'method' => 'GET',
            'icon' => 'far fa-plus-square'
        ],
        [
            'name' => 'edit',
            'label' => 'Editar',
            'method' => 'GET',
            'icon' => 'far fa-edit'
        ],
        [
            'name' => 'destroy',
            'label' => 'Deletar',
            'method' => 'DELETE',
            'icon' => 'far fa-trash-alt'
        ],
    ],

    /**
     * Available Mask's
     */
    'masks' => [
        'dm' => '\Impactasolucoes\Crud\Listing\Mask\Dates::dm',
        'dmY' => '\Impactasolucoes\Crud\Listing\Mask\Dates::dmY',
        'dmYHi' => '\Impactasolucoes\Crud\Listing\Mask\Dates::dmYHi',
        'dmYHis' => '\Impactasolucoes\Crud\Listing\Mask\Dates::dmYHis',
    ],

];
