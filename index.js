/*
    TODO : 1. Sprite Converter 를 만든다.
                1-1 : file read 해서 버퍼에 담는다.
                1-2 : buffer data를 image 로 parsing
                1-3 : 새로운 image buffer 생성 -> 크기는 best fit 으로 맞춘다.
                1-4 : 새로운 Image에 기존의 image를 덮어 씌운다.
                1-5 : 저장한다.
*/

// https://github.com/EyalAr/lwip 참조할 것.

var fs = require('fs');

class FileLoader {
    constructor() {
        // TODO : path 수정 가능하게 만들기.
        this.SPRITE_DIRECTORY_PATH = '/assets/before convert';
    }

    getSprites() {
        var spriteNames = this.getSpriteNames();
        var sprites = [];

        spriteNames.forEach((spriteName) => {
            var readSprite = fs.readFileSync(__dirname + this.SPRITE_DIRECTORY_PATH + '/' + spriteName);
            sprites.push(readSprite);
        });

        return sprites;
    }

    getSpriteNames() {
        var spriteNames = [];

        try {
            var spriteList = fs.readdirSync(__dirname + this.SPRITE_DIRECTORY_PATH);
            spriteList.forEach((fileName) => {
                if (this.isImageFile(fileName)) {
                    spriteNames.push(fileName);
                }
            });
        } catch (exception) {
        }

        return spriteNames;
    }

    isImageFile(name) {
        if (name.match(/(.*(.)png)|(.*(.)jpg)|(.*(.)jpeg)|(.*(.)bmp)|(.*(.)gif)/g)) {
            return true;
        }
        return false;
    }
}

class SpriteConverter {


    getBestFit(base) {
        var bestFit = 1;

        while (bsetFit < base) {
            bestFit *= 2;
        }

        return bestFit;
    }
}


function main() {
    var fileLoader = new FileLoader();
    var spritesBuffers = fileLoader.getSprites();

    console.log(spritesBuffers);
}

main();