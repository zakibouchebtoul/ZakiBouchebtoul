import initAboutTeaser, {
  killAboutTeaser,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/aboutTeaser.js";
import initAwardListHover, {
  killAwardListHover,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/awardListHover.js";
import initAwardListScroll, {
  killAwardListScroll,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/awardListScroll.js";
import initCardList, { killCardList } from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/cardList.js";
import initConnectScroll, {
  killConnectScroll,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/connectScroll.js";
import initFooter, { killFooter } from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/footer.js";
import initHeadlineScroll, {
  killHeadlineScroll,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/headlineScroll.js";
import initProjectTeaser, {
  killProjectTeaser,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/projectTeaser.js";
import initTextOnScroll, {
  killTextOnScroll,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/general/textOnScroll.js";
import initAchievement, {
  killAchievement,
} from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/homepage/achievement.js";
import initPattern, { killPattern } from "https://zakibouchebtoul.github.io/ZakiBouchebtoul/scripts/features/homepage/pattern.js";
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
