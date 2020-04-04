#!/bin/bash
tnpm install
npm run build
mv xxxxxxx.txt dist/
tar -zcvf sumeru-app.tgz dist/
