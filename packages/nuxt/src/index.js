import { join } from "path"

import fountain from "@fountainjs/vue"

const parseFountain = file => fountain.parse(file, function (output) {
  return { ...output, ...{ date: new Date(output.date) } } // { title: '', html: { title_page: '', script: '' } }
})

export default function () {
  const { nuxt } = this

  // Make sure components is enabled
  if (!nuxt.options.components) {
    throw new Error('please set `components: true` inside `nuxt.config` and ensure using `nuxt >= 2.13.0`')
  }

  this.nuxt.hook("components:dirs", (dirs) => {
    // Add ./components dir to the list
    dirs.push({
      path: join(__dirname, "../src/components"),
      prefix: "fountain",
      level: 1
    })
  })

  if (nuxt.options.content) {
    // Extend Nuxt Content
    this.nuxt.hook("content:options", (options) => {
      // Parse content files with the .fountain extension
      options.extendParser['.fountain'] = parseFountain
    })
  }
}

// Used in conjunction with addModule(opts, requireOnce)
// to prevent a module being required more than once.
module.exports.meta = require('../package.json')
