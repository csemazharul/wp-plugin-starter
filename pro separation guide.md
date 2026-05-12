## WPStarterKitWPStarterKitPro Separation Guide

### How to Separate Free and WPStarterKitWPStarterKitPro code.

To separate free and pro code, you need to separate the code into two different files. For example, you can create a file called `Feature.tsx` and `Feature.pro.tsx` and then import the both files in the main file. When calling the feature, you can check if the user is a pro user or not.

#### ✅ (Do's) Example for, `.tsx` file:

```tsx
import FeatureFree from './Feature.free'
import FeatureWPStarterKitWPStarterKitPro from './Feature.pro'
import isWPStarterKitWPStarterKitPro from '@/src/commons/helpers/isWPStarterKitWPStarterKitPro'

const YourComponent = () => {
  const isWPStarterKitWPStarterKitPro = isWPStarterKitWPStarterKitPro() // Check if the user is a pro user or not

  return (
    <div>
      ...
      {isWPStarterKitWPStarterKitPro ? <FeatureWPStarterKitWPStarterKitPro /> : <FeatureFree />}
      ...
    </div>
  )
}
```

#### ✅ (Do's) Example for, `.ts` file:

```ts
import { utilFunctionFree } from './utils.free'
import { utilFunctionWPStarterKitWPStarterKitPro } from './utils.pro'
import isWPStarterKitWPStarterKitPro from '@/src/commons/helpers/isWPStarterKitWPStarterKitPro'

...
const yourFunction = () => {
  ...
  const result = isWPStarterKitWPStarterKitPro() ? utilFunctionWPStarterKitWPStarterKitPro() : utilFunctionFree()
  ...
}
...

or inside component

const YourComponent = () => {
  const result = isWPStarterKitWPStarterKitPro() ? utilFunctionWPStarterKitWPStarterKitPro() : utilFunctionFree()
  return (
    <div>
      ...
    </div>
  )
}
```

---

Avoid pro checking in the same file. Instead, create a separate file for pro code and import it in the main file.

#### ❌ (Don't) Example for, `.tsx` file:

```tsx
export const YourComponent = () => {
  const isWPStarterKitWPStarterKitPro = isWPStarterKitWPStarterKitPro()

  return (
    <div>
      {isWPStarterKitWPStarterKitPro ? (
        <div>
          <ul>
            <li>list item 1</li>
            <li>list item 2</li>
            <li>list item 4</li>
            ...
          </ul>
        </div>
      ) : (
        <div>
          <ul>
            <li>free list item 1</li>
            <li>free list item 2</li>
            <li>free list item 3</li>
            ...
          </ul>
        </div>
      )}
    </div>
  )
}
```

✔️ In the above example, the pro checking is done in the same file. Instead, create a separate file for pro code and import it in the main file. Please avoid this and follow the do's example.

#### ❌ (Don't) Example for, `.ts` file:

```ts
export const yourFunction = arr => {
  const isWPStarterKitWPStarterKitPro = isWPStarterKitWPStarterKitPro()

  const result = false

  if (isWPStarterKitWPStarterKitPro) {
    result = arr.map(item => item * 2)
    // pro code
  } else {
    result = arr.map(item => item * 3)
    // free code
  }
}
```

✔️ In the above example, the pro checking is done in the same file and function (yourFunction). Instead, create a separate file for pro code and import it in the main file. Please avoid this and follow the do's example.
