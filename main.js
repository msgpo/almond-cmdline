#!/usr/bin/env node
// -*- mode: js; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// This file is part of ThingEngine
//
// Copyright 2016-2017 The Board of Trustees of the Leland Stanford Junior University
//
// Author: Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See COPYING for details
"use strict";

const Q = require('q');
Q.longStackSupport = true;
process.on('unhandledRejection', (up) => { throw up; });

const Engine = require('thingengine-core');
const AssistantDispatcher = require('./assistant');

function main() {
    let platform = require('./platform').newInstance();
    let engine = new Engine(platform);

    let _ad = new AssistantDispatcher(engine);
    platform.setAssistant(_ad);

    Promise.resolve().then(() => {
        return engine.open();
    }).then(() => {
        return _ad.interact();
    }).catch((e) => {
        console.error('Error during initialization: ' + e);
        throw e;
    });
}

main();
