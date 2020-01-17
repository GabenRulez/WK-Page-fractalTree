//       Global variables     //
var screenWidth = 0;
var screenHeight = 0;
setScreenSize();

var currentConfig;
var smallMovementsOn = true;
var creationAnimationOn = false;

var workspaceFractalTree = document.getElementById('workspaceFractalTree');
var currentBranches;

//      Global constants     //

const defaultConfig_createTreeWith2Branches = {
    branchWidth:                    "80%",
    branchHeight:                   "80%",
    branchTransformOrigin:          "bottom",
    branchTransform_translate:      "translate(0%, -97.5%) ",
    branchTransform_rotateLeft:     "rotate(-20deg)",
    branchTransform_rotateRight:    "rotate(27deg)"
}

/*
function createConfig_createTreeWith2Branches(branchWidth, branchHeight, branchTransformOrigin, branchTransform_translate, branchTransform_rotateLeft, branchTransform_rotateRight){
    if(branchWidth                  === undefined) branchWidth                  = defaultConfig_createTreeWith2Branches.branchWidth;
    if(branchHeight                 === undefined) branchHeight                 = defaultConfig_createTreeWith2Branches.branchHeight;
    if(branchTransformOrigin        === undefined) branchTransformOrigin        = defaultConfig_createTreeWith2Branches.branchTransformOrigin;
    if(branchTransform_translate    === undefined) branchTransform_translate    = defaultConfig_createTreeWith2Branches.branchTransform_translate;
    if(branchTransform_rotateLeft   === undefined) branchTransform_rotateLeft   = defaultConfig_createTreeWith2Branches.branchTransform_rotateLeft;     else branchTransform_rotateLeft   = " rotate(" + branchTransform_rotateLeft     + "deg)";
    if(branchTransform_rotateRight  === undefined) branchTransform_rotateRight  = defaultConfig_createTreeWith2Branches.branchTransform_rotateRight;    else branchTransform_rotateRight  = " rotate(" + branchTransform_rotateRight    + "deg)";

    return newConfig_createTreeWith2Branches = {
        branchWidth:                    branchWidth,
        branchHeight:                   branchHeight,
        branchTransformOrigin:          branchTransformOrigin,
        branchTransform_translate:      branchTransform_translate,
        branchTransform_rotateLeft:     branchTransform_rotateLeft,
        branchTransform_rotateRight:    branchTransform_rotateRight
    };
}

*/


async function createTreeWith2Branches(maxIterations = 8, config = defaultConfig_createTreeWith2Branches){          //@TODO wprowadzić możliwość tworzenia nie 2, a N gałęzi wychodzących

    var allBranches = Array.from( workspaceFractalTree.getElementsByClassName('treeBranch') );

    var branchesThen = 0;
    var branchesNow = allBranches.length;
    var currentIteration = 1;
    
    var i = branchesThen;

    while( currentIteration <= maxIterations ){
        var temp1 = branchesThen;
        var temp2 = branchesNow;

        for(var i=temp1; i<temp2; i++){

            var currentBranch = allBranches[i];

            newTreeBranch1 = document.createElement("div");
            newTreeBranch2 = document.createElement("div");

            newTreeBranch1.classList.add('treeBranch');
            newTreeBranch2.classList.add('treeBranch');

            newTreeBranch1.classList.add('left');
            newTreeBranch2.classList.add('right');

            newTreeBranch1.style["width"] = config.branchWidth;                                                                 //"80%";
            newTreeBranch2.style["width"] = config.branchWidth;                                                                 //"80%";

            newTreeBranch1.style["height"] = config.branchHeight;                                                               //"80%";
            newTreeBranch2.style["height"] = config.branchHeight;                                                               //"80%";

            newTreeBranch1.style["transform-origin"] = config.branchTransformOrigin;                                            //"bottom";
            newTreeBranch2.style["transform-origin"] = config.branchTransformOrigin;                                            //"bottom";

            newTreeBranch1.style["transform"] = config.branchTransform_translate + config.branchTransform_rotateLeft;           //"translate(0%, -97.5%) rotate(-20deg)"; 
            newTreeBranch2.style["transform"] = config.branchTransform_translate + config.branchTransform_rotateRight;          //"translate(0%, -97.5%) rotate(27deg)";

            // testing starts here


            var iterationsRatio = currentIteration/maxIterations;
            //var color_tree = "rgb(" + (iterationsRatio*19+(1-iterationsRatio)*108) + "," + (iterationsRatio*70+(1-iterationsRatio)*90) + "," + (iterationsRatio*29+(1-iterationsRatio)*73) + ")";

            //var color1 = 255*(currentIteration-1)/maxIterations;
            var color2 = 255*currentIteration/maxIterations;
            //var color1_ = "rgb(" + color1 + "," + color1 + "," + color1 + ")";
            var color2_ = "rgb(" + color2 + "," + color2 + "," + color2 + ")";
            //newTreeBranch1.style["background"] = "linear-gradient(" + color2_ + "," + color1_ + ")";
            //newTreeBranch2.style["background"] = "linear-gradient(" + color2_ + "," + color1_ + ")";
            newTreeBranch1.style["background"] = color2_;
            //color2_  = "rgb(" + 3*iterationsRatio + "," + 92*iterationsRatio + ",0)";
            newTreeBranch2.style["background"] = color2_;
            //newTreeBranch1.style["background"] = "rgb(101, 65, 160)";




            ///// testing ends here

            currentBranch.appendChild(newTreeBranch1);
            currentBranch.appendChild(newTreeBranch2);

            allBranches.push(newTreeBranch1);
            allBranches.push(newTreeBranch2);
            //console.log(allBranches.length);
            branchesThen += 1;
            branchesNow += 2;

            if(creationAnimationOn) await sleep(1);
        };
    currentIteration++;
    }
    currentBranches = allBranches;
}

var config1 = createConfig_createTreeWith2Branches("75%", "80%", undefined, undefined, -22, 17);
currentConfig = config1;

//var allBranches = createTreeWith2Branches(8, config1);



// TODO tutaj!
createTreeWith2Branches(9, config1);




async function updateTreeAngles(degLeft, degRight, currentTree){     // przestarzale
    console.log("'updateTreeAngles'. Amount of branches: "+currentTree.length );
    for(var i=1; i<currentTree.length; i++){
        await sleep(15);
        if(i%2 == 1)
        currentTree[i].style["transform"] = "translate(0%, -95%) rotate(" + degLeft + "deg)";
        else
        currentTree[i].style["transform"] = "translate(0%, -95%) rotate(" + degRight + "deg)";
    }


}

async function addSmallMovementsToTree(timeInterval = 10000, currentTree, currentConfig = defaultConfig_createTreeWith2Branches){           // niedokończone
    while(smallMovementsOn){
        await sleep(timeInterval);
        updateTreeAngles(-17, 31, currentTree);

        await sleep(timeInterval*2);
        updateTreeAngles(-18, 19, currentTree);

        await sleep(timeInterval);
        updateTreeAngles(-19, 40, currentTree);
    }

}

addSmallMovementsToTree(10000, currentBranches, config1);

async function addSmallMovementsToTree2(timeInterval = 10000, currentTree, currentConfig = defaultConfig_createTreeWith2Branches){           // niedokończone
    while(smallMovementsOn){
        await sleep(timeInterval);
        updateTreeAngles(-2, 2, currentTree);

        await sleep(timeInterval*10);
        updateTreeAngles(-18, 19, currentTree);

        await sleep(timeInterval*15);
        updateTreeAngles(-19, 40, currentTree);
    }

}
//addSmallMovementsToTree2(1000, currentBranches, config1);


// ola 1
//updateTreeAngles(-360,90, currentBranches);





// Setup Functions

function createConfig_createTreeWith2Branches(branchWidth, branchHeight, branchTransformOrigin, branchTransform_translate, branchTransform_rotateLeft, branchTransform_rotateRight){
    if(branchWidth                  === undefined) branchWidth                  = defaultConfig_createTreeWith2Branches.branchWidth;
    if(branchHeight                 === undefined) branchHeight                 = defaultConfig_createTreeWith2Branches.branchHeight;
    if(branchTransformOrigin        === undefined) branchTransformOrigin        = defaultConfig_createTreeWith2Branches.branchTransformOrigin;
    if(branchTransform_translate    === undefined) branchTransform_translate    = defaultConfig_createTreeWith2Branches.branchTransform_translate;
    if(branchTransform_rotateLeft   === undefined) branchTransform_rotateLeft   = defaultConfig_createTreeWith2Branches.branchTransform_rotateLeft;     else branchTransform_rotateLeft   = " rotate(" + branchTransform_rotateLeft     + "deg)";
    if(branchTransform_rotateRight  === undefined) branchTransform_rotateRight  = defaultConfig_createTreeWith2Branches.branchTransform_rotateRight;    else branchTransform_rotateRight  = " rotate(" + branchTransform_rotateRight    + "deg)";

    return newConfig_createTreeWith2Branches = {
        branchWidth:                    branchWidth,
        branchHeight:                   branchHeight,
        branchTransformOrigin:          branchTransformOrigin,
        branchTransform_translate:      branchTransform_translate,
        branchTransform_rotateLeft:     branchTransform_rotateLeft,
        branchTransform_rotateRight:    branchTransform_rotateRight
    };
}




// Utility Functions

function sleep(ms) {    return new Promise( resolve => setTimeout( resolve, ms ) );     };

function setScreenSize(){ setViewPortSize(); };

function setViewPortSize(){
    var win = window, 
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0];

    screenWidth     = win.innerWidth || docElem.clientWidth || body.clientWidth;
    screenHeight    = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
}

// CSS inline file adding
    var final_style = document.createElement('style');
    final_style.type = 'text/css';

    function addNewStyle(selector, style){
    final_style.innerHTML += selector + '{ ' + style + ' } \n';
    };

    function submitNewStyle(){
    document.getElementsByTagName('head')[0].appendChild(final_style);
    
    final_style = document.createElement('style');
    final_style.type = 'text/css';
    };
//