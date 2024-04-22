import { getNewLight } from "./utils";

export const LEVEL = [
    [
        getNewLight({}),
        getNewLight({})
    ],
    [
        getNewLight({}),
        getNewLight({}),
        getNewLight({})
    ],
    [
        getNewLight({ broken: true }),
        getNewLight({}),
        getNewLight({})
    ],
    [
        getNewLight({}),
        getNewLight({}),
        getNewLight({}),
        getNewLight({})
    ],
    [
        getNewLight({}),
        getNewLight({}),
        getNewLight({}),
        getNewLight({}),
        getNewLight({})
    ],
    [
        getNewLight({ broken: true }),
        getNewLight({}),
        getNewLight({}),
        getNewLight({}),
        getNewLight({})
    ]
]