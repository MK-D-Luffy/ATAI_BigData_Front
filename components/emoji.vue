<template>
  <twemoji-textarea
    :emojiData="emojiDataAll"
    :emojiGroups="emojiGroups"
    enableSendBtn="true"
    maxlength="100"
    @enterKey="onEnterKey">
  </twemoji-textarea>
</template>
<script>
import {
  TwemojiTextarea
} from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';
export default {
  name: 'emoji',
  components: {
    'twemoji-textarea': TwemojiTextarea
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  },
  methods: {
    onEnterKey(e) {
      console.log("ClickedEnter", e);
    }
  }
}
</script>
