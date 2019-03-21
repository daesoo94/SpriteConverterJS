/*
    TODO : 1. Sprite Converter 를 만든다.
                1-1 : file read 해서 버퍼에 담는다.
                1-2 : buffer data를 image 로 parsing
                1-3 : 새로운 image buffer 생성 -> 크기는 best fit 으로 맞춘다.
                1-4 : 새로운 Image에 기존의 image를 덮어 씌운다.
                1-5 : 저장한다.
*/

var fs = require('fs');
var Jimp = require('jimp');

class SpriteLoader {
    constructor() {
        // TODO : path 수정 가능하게 만들기.
        this.SPRITE_DIRECTORY_PATH = '/assets/sprites';
    }

    getSprites() {
        return new Promise((resolve) => {
            var spriteNames = this.getSpriteNames();
            var sprites = [];

            spriteNames.forEach((spriteName) => {
                Jimp.read(__dirname + this.SPRITE_DIRECTORY_PATH + '/' + spriteName)
                    .then(readSprite => {
                        readSprite.id = spriteName;
                        sprites.push(readSprite);
                        if (sprites.length == spriteNames.length) {
                            resolve(sprites);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
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
        if (name.match(/(.*(.)png)|(.*(.)jpg)|(.*(.)jpeg)|(.*(.)bmp)/g)) {
            return true;
        }
        return false;
    }
}

class SpriteConverter {
    converting(sprites) {
        sprites.forEach((sprite) => {
            var width = sprite.bitmap.width;
            var height = sprite.bitmap.height;
            var bestWidth = this.getBestFit(width);
            var bestHeight = this.getBestFit(height);

            new Jimp(bestWidth, bestHeight, 0x00000000)
                .blit(sprite, 0, 0)
                .writeAsync(__dirname + '/converted/' + sprite.id);
        });
    }

    getBestFit(base) {
        var bestFit = 1;

        while (bestFit < base) {
            bestFit *= 2;
        }

        return bestFit;
    }
}


async function main() {
    var spriteLoader = new SpriteLoader();
    var spriteConverter = new SpriteConverter();

    spriteConverter.converting(await spriteLoader.getSprites());
}

main();