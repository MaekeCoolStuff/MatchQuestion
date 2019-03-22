import { MatchContainer } from "./match-container";

export class CollisionService {
    public static matchContainers: MatchContainer[] = [];

    public static checkForCollisions(x, y, text): boolean {
        let hasCollisions: boolean = false;
        CollisionService.matchContainers.forEach(c => {
            let isInDropzone = c.getBounds().contains(x, y);
            if(isInDropzone) {
                hasCollisions = true;
                c.setText(text);
            }
        });

        return hasCollisions;
    }
}