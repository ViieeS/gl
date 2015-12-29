{*<select id="tv{$tv->id}" name="tv{$tv->id}" class="combobox"></select>*}
<input id="tv{$tv->id}" class="textfield x-form-text x-form-field" name="tv{$tv->id}" type="text" />
<script type="text/javascript">
    // <![CDATA[
    {literal}
    Ext.onReady(function() {
        MODx.load({
            {/literal}
            xtype: 'textfield'
            ,applyTo: 'tv{$tv->id}'
            ,width: '500'
            ,name: 'tv{$tv->id}'
            ,hiddenName: 'tv{$tv->id}'
            ,transform: 'tv{$tv->id}'
            ,id: 'tv{$tv->id}'
            ,value: '{$tv->value}'
            {literal}

        });
    });
    {/literal}
    // ]]>
</script>