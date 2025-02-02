import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk?version=3.0';
import AgsBox from './box.js';

export default class AgsCenterBox extends AgsBox {
    static {
        GObject.registerClass({
            GTypeName: 'AgsCenterBox',
            Properties: {
                'start-widget': GObject.ParamSpec.object(
                    'start-widget', 'Start Widget', 'Start Widget',
                    GObject.ParamFlags.READWRITE | GObject.ParamFlags.CONSTRUCT,
                    Gtk.Widget.$gtype,
                ),
                'center-widget': GObject.ParamSpec.object(
                    'center-widget', 'Center Widget', 'Center Widget',
                    GObject.ParamFlags.READWRITE | GObject.ParamFlags.CONSTRUCT,
                    Gtk.Widget.$gtype,
                ),
                'end-widget': GObject.ParamSpec.object(
                    'end-widget', 'End Widget', 'End Widget',
                    GObject.ParamFlags.READWRITE | GObject.ParamFlags.CONSTRUCT,
                    Gtk.Widget.$gtype,
                ),
            },
        }, this);
    }

    set children(children: Gtk.Widget[] | null) {
        this.get_children().forEach(ch => ch.destroy());

        if (!children)
            return;

        if (children[0])
            this.start_widget = children[0];

        if (children[1])
            this.center_widget = children[1];

        if (children[2])
            this.end_widget = children[2];
    }

    _start!: Gtk.Widget | null;
    get start_widget() { return this._start || null; }
    set start_widget(child: Gtk.Widget | null) {
        if (this._start)
            this._start.destroy();

        this._start = child;

        if (!child)
            return;

        this.pack_start(child, true, true, 0);
        this.show_all();
    }

    _end!: Gtk.Widget | null;
    get end_widget() { return this._end || null; }
    set end_widget(child: Gtk.Widget | null) {
        if (this._end)
            this._end.destroy();

        this._end = child;

        if (!child)
            return;

        this.pack_end(child, true, true, 0);
        this.show_all();
    }

    get center_widget() { return this.get_center_widget(); }
    set center_widget(child: Gtk.Widget | null) {
        const center_widget = this.get_center_widget();
        if (!child && center_widget) {
            center_widget.destroy();
            return;
        }

        this.set_center_widget(child);
    }
}
