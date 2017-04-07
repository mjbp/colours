const webshot = require('webshot'),
      fs  = require('fs'),
      ColorThief = require('color-thief'),
      colorThief = new ColorThief();

const captureRGB = url => {
    return new Promise((resolve, reject) => {
        webshot(url, 'tmp.png', function(err) {
            if(err) reject(err);

            let colour = colorThief.getColor('tmp.png');
            fs.unlink('tmp.png');
            resolve(colour);
	    });
    });
}

const sequentialCapture = urls => {
    let colours = [];
	return new Promise((resolve, reject) => {
		let next = () => {
			if (!urls.length) return resolve(colours);
			captureRGB(urls.shift(), false)
                .then(res => {
                    colours.push(res);
                    next();
                })
                .catch(reject);
		};
		next();
	});
};

// let time = process.hrtime();
// sequentialCapture(['theguardian.com', 'bbc.co.uk'])
//     .then(res => {
//         let diff = process.hrtime(time);
//         console.log(`Benchmark took ${(diff[0] * 1e9 + diff[1]) * 1e-9} seconds`);
//         console.log(res);
//     });

module.exports = captureRGB;
