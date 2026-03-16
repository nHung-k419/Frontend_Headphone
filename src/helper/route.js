import { routeTranslate } from "../routes/routeTranslate";

export const getRoute = (path) => {
    for (const key in routeTranslate) {
        if (key.includes(":id")) {
            const base = key.replace("/:id", "");
            if (path.startsWith(base)) {
                const id = path.replace(base + "/", "");
                return routeTranslate[key].replace(":id", id);
            }
        }
    }

    return routeTranslate[path] || path;
};