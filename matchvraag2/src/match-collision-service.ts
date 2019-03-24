import { MatchContainer } from "./match-container";
import { MatchItem } from "./match-item";
import { MatchItemContainer } from "./match-item-container";

export class MatchCollisionService {
    public static matchContainers: MatchContainer[] = [];
    public static matchItemContainers: MatchItemContainer[] = [];

    public static checkForContainerCollisions(x, y, matchItem: MatchItem): boolean {
        let hasCollisions: boolean = false;
        let allContainersToCheck: any[] = <any[]>MatchCollisionService.matchContainers
            .concat(<any[]>MatchCollisionService.matchItemContainers)
        
            allContainersToCheck.forEach(c => {
            let isInDropzone = c.getBounds().contains(x, y);
            if(isInDropzone) {
                hasCollisions = true;
                c.setMatchItem(matchItem);
            }
        });

        return hasCollisions;
    }
}