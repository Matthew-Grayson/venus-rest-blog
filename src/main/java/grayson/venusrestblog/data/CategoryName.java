package grayson.venusrestblog.data;

public enum CategoryName {
    SPORTS("sports"), POLITICS("politics"), ANIMALS("animals"), HEALTH("health"), HUMOR("humor"), EVENTS("events");

    private final String tag;

    CategoryName(String tag) {
        this.tag = tag;
    }
    String tag() {
        return tag;
    }
}
