import event from '@/event'
export default {
  data () {
    return {
      events: [],
      event: event
    }
  },
  methods: {
	// 注册
    addEvent (key, fn) {
      event.$on(key, fn);
      this.events.push({
        remove: () => {
          event.$off(key, fn);
        }
      })
      return fn;
    },
  },
  beforeDestroy () {
	// 销毁
    if (this.events.length > 0) {
      this.events.forEach(item => {
        item.remove();
      })
    }
  },
}


import eventMix from "@/eventMiddleware";
export default {
	mixins: [eventMix],
	mounted () {
		this.event.$emit('changeTab', 1)
		this.addEvent('tabChange', (v) => {
		  //mixins内自动销毁
		  if (v === 2) {
			...
		  } else if(v === 3) {
			...
		  }
		});
		this.addEvent('btn:close', this.goBack)
		this.addEvent('btn:save', this.save)
	},
}
