import { PandaIconLibrary } from "./panda-icon-library";
import { mapIcons } from "./resources/map-icons";
import { tempIcons } from "./resources/temp-icons";

// add icons
const pandaIconLibrary = new PandaIconLibrary();
pandaIconLibrary.registerIcons(mapIcons);
pandaIconLibrary.registerIcons(tempIcons);
