<template>
  <div class="example">
    <client-only>
      <codemirror
        class="codemirror"
        v-model="code"
        :options="cmOption"
        @cursorActivity="onCmCursorActivity"
        @ready="onCmReady"
        @focus="onCmFocus"
        @blur="onCmBlur"
      />
    </client-only>
  </div>
</template>

<script>
import dedent from 'dedent'

export default {
  name: 'codemirror-example-nuxt',
  data() {
    return {
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-java',
        theme: 'base16-light'
      },
      code: dedent`

        `
    }
  },
  methods: {
    onCmCursorActivity(codemirror) {
      console.debug('onCmCursorActivity', codemirror)
    },
    onCmReady(codemirror) {
      console.debug('onCmReady', codemirror)
    },
    onCmFocus(codemirror) {
      console.debug('onCmFocus', codemirror)
    },
    onCmBlur(codemirror) {
      console.debug('onCmBlur', codemirror)
    }
  }
}
</script>

<style lang="scss" scoped>
.example {
  display: flex;
  height: 100%;

  .codemirror {
    width: 50%;
    height: 100%;
    margin: 0;
    overflow: auto;
  }
}
</style>
