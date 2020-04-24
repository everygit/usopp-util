# usopp-util
Some general methods of accumulation

## Example

### chainval
```js
import { chainval } from 'usopp-util';

var demo = {
    overview: {
        inverters: [
            {
                name: 'sn',
                dc: 100,
                ac: 220
            },
            {
                name: 'sn01',
                dc: 250,
                ac: 220
            }
        ],
        flows: {
            grid: 100,
            pv: [
                [0, "12.5"],
                ['22', '30']
            ]
        }
    }
}

var a = chainval(demo, 'overview.inverters[0].name', 'no-name');
// sn
```

### merge

from jquery

```js
import { merge } from 'usopp-util'

var r = merge(true, {a:1}, {b:2});
// {
//     a: 1,
//     b: 2
// }
```