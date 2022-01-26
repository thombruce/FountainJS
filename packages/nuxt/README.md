<h1 id="fountain-js" align="center">Nuxt Fountain</h1>

<p align="center"><a href="https://www.patreon.com/thombruce"><img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron"></a></p>

<p align="center"><a href="https://github.com/thombruce/vue-fountain/issues"><img src="https://img.shields.io/github/issues-raw/thombruce/vue-fountain?logo=github" alt="GitHub issues"></a></p>

<p align="center"><a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"></a></p>

<p align="center">A JavaScript based parser for the screenplay format <a href="https://fountain.io/">Fountain</a>.</p>

## Installation

```sh
# With Yarn
yarn add @thombruce/vue-fountain
# With npm
npm install @thombruce/vue-fountain --save
```

### If you're using Nuxt

Add `vue-fountain/nuxt` to `buildModules` in `nuxt.config.js`:

```js
  buildModules: [
    // ...
    "@thombruce/vue-fountain/nuxt",
    // ...
  ],
```

This will make all of Vue Fountain's components available globally, so that you can use them without having to first `import` them. It also adds a custom parser to [Nuxt Content](https://content.nuxtjs.org/) so that you can serve `.fountain` files from your static site.

## Usage

Pass your screenplay as a prop:

```vue
<template>
<!-- The screenplay prop can be a string containing your screenplay or
a JSON object that has already been parsed (if using Nuxt Content) -->
<fountain-screenplay :screenplay='myScreenplay'></fountain-screenplay>
</template>
```

Or as the default slot content:

```vue
<template>
<fountain-screenplay>
INT. MUSIC ROOM - EVENING

CASSANDRA (CONT'D)
(sign language)
What are we going to do?
</fountain-screenplay>
</template>
```

You can also use this component in your Nuxt Content Markdown files, but be careful; you should wrap the interior slot content in `<template></template>` tags to have this behave as expected:

```html
<fountain-screenplay>
<template>
INT. MUSIC ROOM - EVENING

CASSANDRA (CONT'D)
(sign language)
What are we going to do?
</template>
</fountain-screenplay>
```

### Title Pages

By default, Vue Fountain does not show a title page. If your screenplay contains Fountain-formatted title page metadata that you want to display as a title page, you can use the `title` prop:

```vue
<template>
<fountain-screenplay title>
Title: A Silent Musical
Credit: written by
Author: Thom Bruce
Draft Date: 2010-06-06

INT. MUSIC ROOM - EVENING

CASSANDRA (CONT'D)
(sign language)
What are we going to do?
</fountain-screenplay>
</template>
```