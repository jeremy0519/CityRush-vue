import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    // add more generic rulesets here
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    eslintConfigPrettier,
    {
        rules: {
            // override/add rules settings here
            'vue/no-unused-vars': [
                'error',
                {
                    ignorePattern: '^_'
                }
            ],
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_'
                }
            ]
        }
    }
]
