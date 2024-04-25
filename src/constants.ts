import { getNewLight } from "./utils";

export const LEVEL = [
    [
        getNewLight({ hideTemperature: true }),
        getNewLight({ hideTemperature: true }),
    ],
    [
        getNewLight({ hideTemperature: true, broken: true }),
        getNewLight({ hideTemperature: true }),
    ],
    [
        getNewLight({}),
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
        getNewLight({ broken: true }),
        getNewLight({}),
        getNewLight({})
    ],
    [
        getNewLight({ broken: true }),
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
    ],
    [
        getNewLight({ broken: true }),
        getNewLight({ broken: true }),
        getNewLight({}),
        getNewLight({}),
        getNewLight({}),
        getNewLight({})
    ]
]