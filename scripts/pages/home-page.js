import initAboutTeaser, {
  killAboutTeaser,
} from "https://zakibouchebtoul.pro/scripts/features/general/aboutTeaser.js";
import initAwardListHover, {
  killAwardListHover,
} from "https://zakibouchebtoul.pro/scripts/features/general/awardListHover.js";
import initAwardListScroll, {
  killAwardListScroll,
} from "https://zakibouchebtoul.pro/scripts/features/general/awardListScroll.js";
import initCardList, { killCardList } from "https://zakibouchebtoul.pro/scripts/features/general/cardList.js";
import initConnectScroll, {
  killConnectScroll,
} from "https://zakibouchebtoul.pro/scripts/features/general/connectScroll.js";
import initFooter, { killFooter } from "https://zakibouchebtoul.pro/scripts/features/general/footer.js";
import initHeadlineScroll, {
  killHeadlineScroll,
} from "https://zakibouchebtoul.pro/scripts/features/general/headlineScroll.js";
import initProjectTeaser, {
  killProjectTeaser,
} from "https://zakibouchebtoul.pro/scripts/features/general/projectTeaser.js";
import initTextOnScroll, {
  killTextOnScroll,
} from "https://zakibouchebtoul.pro/scripts/features/general/textOnScroll.js";
import initAchievement, {
  killAchievement,
} from "https://zakibouchebtoul.pro/scripts/features/homepage/achievement.js";
import initPattern, { killPattern } from "https://zakibouchebtoul.pro/scripts/features/homepage/pattern.js";
import initReducedTeaser, {
  killReducedTeaser,
} from "https://zakibouchebtoul.pro/scripts/features/listPage/reducedTeaser.js";
import shared from "./shared.js";
function init() {
  initAwardListHover(),

    initCardList()

}
function mobileInit() {
    initCardList()
  
}
function cleanup() {
 
}
function mobileCleanup() {

}
export default { init, cleanup, mobileInit, mobileCleanup };
