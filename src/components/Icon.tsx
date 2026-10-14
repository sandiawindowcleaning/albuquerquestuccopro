import {
  BrickWall, PaintRoller, Hammer, Snowflake, CloudRain, Building2, Fence, Mountain, Search,
  Bug, Sun, EyeOff, Wrench, Shield, Wind, Ruler,
  House, Sparkles, Droplets, Leaf, Flame, Palette, Clock, Layers, type LucideProps,
} from 'lucide-react';
import type { IconName } from '../data/types';

const MAP = {
  'brick-wall': BrickWall, 'paint-roller': PaintRoller, hammer: Hammer, snowflake: Snowflake,
  'cloud-rain': CloudRain, building: Building2, fence: Fence, mountain: Mountain, search: Search,
  bug: Bug, sun: Sun, 'eye-off': EyeOff, wrench: Wrench,
  shield: Shield, wind: Wind, ruler: Ruler, home: House,
  sparkles: Sparkles, droplets: Droplets, leaf: Leaf, flame: Flame,
  palette: Palette, clock: Clock, layers: Layers,
} satisfies Record<IconName, unknown>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = MAP[name];
  return <C aria-hidden="true" {...props} />;
}
