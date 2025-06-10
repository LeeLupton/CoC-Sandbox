export interface Types {
    AirDefense:     AirDefense;
    ArcherTower:    AirDefense;
    BombTower:      BombTower;
    BuildersHut:    BuildersHut[];
    Cannon:         AirDefense;
    EagleArtillery: EagleArtillery;
    GiantCannon:    AirDefense;
    HiddenTesla:    AirDefense;
    InfernoTower:   InfernoTower;
    MegaTesla:      AirDefense;
    Mortar:         Mortar;
    Scattershot:    Scattershot;
    WizardTower:    AirDefense;
    "X-Bow":        XBow;
}

export interface AirDefense {
    levels: AirDefenseLevel[];
    range:  number;
}

export interface AirDefenseLevel {
    level:       number;
    dps:         number;
    dph:         number;
    hp:          number;
    cost:        number;
    build_time:  string;
    exp:         number;
    th_required: number;
}

export interface BombTower {
    levels: BombTowerLevel[];
    range:  number;
}

export interface BombTowerLevel {
    level:       number;
    dps:         number;
    dph:         number;
    hp:          number;
    cost:        number;
    build_time:  string;
    exp:         string;
    th_required: number;
}

export interface BuildersHut {
    level:       number;
    dps:         number | string;
    dph:         number | string;
    hp:          number | string;
    cost:        number | string;
    build_time:  string;
    exp:         number | string;
    th_required: string;
}

export interface EagleArtillery {
    levels:    BombTowerLevel[];
    range_min: number;
    range_max: number;
}

export interface InfernoTower {
    levels:       AirDefenseLevel[];
    range_single: number;
    range_multi:  number;
}

export interface Mortar {
    levels:    AirDefenseLevel[];
    range_min: number;
    range_max: number;
}

export interface Scattershot {
    levels:    ScattershotLevel[];
    range_min: number;
    range_max: number;
}

export interface ScattershotLevel {
    level:       number;
    dps:         number;
    dph:         string;
    hp:          string;
    cost:        number;
    build_time:  string;
    exp:         string;
    th_required: number;
}

export interface XBow {
    levels:           AirDefenseLevel[];
    range_ground:     number;
    range_air_ground: number;
}
