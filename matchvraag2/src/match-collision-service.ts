import { MatchContainer } from "./match-container";
import { MatchItem } from "./match-item";
import { MatchItemContainer } from "./match-item-container";

export class MatchCollisionService {
    public static matchContainers: MatchContainer[] = [];
    public static matchItemContainers: MatchItemContainer[] = [];

    public static checkForMatchContainerCollisions(x, y, matchItem: MatchItem): boolean {
        let hasCollisions: boolean = false;
        MatchCollisionService.matchContainers.forEach(c => {
            let isInDropzone = c.getBounds().contains(x, y);
            if(isInDropzone) {
                hasCollisions = true;
                c.setMatchItem(matchItem);
            }
        });

        return hasCollisions;
    }

    public static checkForMatchItemContainerCollisions(x, y, matchItem: MatchItem): boolean {
        let hasCollisions: boolean = false;
        MatchCollisionService.matchItemContainers.forEach(c => {
            let isInDropzone = c.getBounds().contains(x, y);
            if(isInDropzone) {
                hasCollisions = true;
                c.setMatchItem(matchItem);
            }
        });

        return hasCollisions;
    }
}