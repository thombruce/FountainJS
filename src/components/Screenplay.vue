<script>
import fountain from '../fountain'

var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  })
    .join('\n')
    .replace(/^\s+|\s+$/g, '')
}

export default {
  props: {
    screenplay: [Object, String],
    title: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    document () {
      if (this.$slots.default) return fountain.parse(getChildrenTextContent(this.$slots.default))
      if (typeof this.screenplay === 'string') return fountain.parse(this.screenplay)
      if (typeof this.screenplay === 'object' && this.screenplay.html && this.screenplay.html.script) return this.screenplay
      return false
    }
  },
  render: function (createElement) {
    if (this.document) {
      const titlePage = createElement(
        'header',
        { attrs: { class: 'title-page' }, domProps: { innerHTML: this.document.html.title_page } }
      )

      const script = createElement(
        'div',
        { attrs: { class: 'script' }, domProps: { innerHTML: this.document.html.script } }
      )

      return createElement(
        'article',
        { attrs: { class: 'screenplay' } },
        [
          ...(this.title ? [titlePage] : []),
          script
        ]
      )
    }
    return createElement('article', { attrs: { class: 'screenplay' } })
  }
}
</script>

<style>
@import '../assets/screenplay';
</style>
