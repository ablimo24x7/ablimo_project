import React from "react";
import {
  Shield, Clock, Users, MapPin, Building, Route, Plane, Car, Star, Zap,
  Globe, Calendar, Briefcase, Gem, Landmark, Bus, Gift, Flag, Sparkles,
  ArrowRight, ArrowLeft, ChevronDown, ChevronRight, CheckCircle, User,
  Receipt, Satellite, IdCard, FileText, Phone, Mail, Headset, Download,
  Map, Navigation, Compass, Target, Award, Heart, Eye, Lock, File,
  Settings, Wrench, Fuel, Gauge, Sofa, Wifi, Snowflake, Mic,
  Camera, Video, Music, Trophy, Medal, Crown, Diamond, Ribbon,
  Search, Filter, SortAsc, Menu, X, Plus, Minus, ExternalLink,
  Link as LinkIcon, BookOpen, HelpCircle, MessageCircle, Send, Paperclip,
  ClipboardList, FileCheck, FileSearch, FolderOpen,
  CalendarCheck, Timer, Hourglass, BatteryFull, BatteryCharging,
  Thermometer, Wind, Cloud, Sun, Moon, Umbrella, Waves,
  Anchor, Ship, Truck, Forklift, HardHat, Hammer,
  Cpu, Monitor, Smartphone, Tablet, Laptop,
  Database, Server, CloudRain, Signal, Bluetooth,
  Volume2, VolumeX, Bell, BellOff, Bookmark, Tag, Tags,
  Home, Store, Factory, Warehouse, Building2, Castle, Church, Mosque,
  GraduationCap, Stethoscope, Pill, HeartPulse, Syringe, Bandage,
  DollarSign, TrendingUp, BarChart3, PieChart, Activity,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield, Clock, Users, MapPin, Building, Route, Plane, Car, Star, Zap,
  Globe, Calendar, Briefcase, Gem, Landmark, Bus, Gift, Flag, Sparkles,
  ArrowRight, ArrowLeft, ChevronDown, ChevronRight, CheckCircle, User,
  Receipt, Satellite, IdCard, FileText, Phone, Mail, Headset, Download,
  Map, Navigation, Compass, Target, Award, Heart, Eye, Lock, File,
  Settings, Wrench, Fuel, Gauge, Sofa, Wifi, Snowflake, Mic,
  Camera, Video, Music, Trophy, Medal, Crown, Diamond, Ribbon,
  Search, Filter, SortAsc, Menu, X, Plus, Minus, ExternalLink,
  Link: LinkIcon, BookOpen, HelpCircle, MessageCircle, Send, Paperclip,
  ClipboardList, FileCheck, FileSearch, FolderOpen,
  CalendarCheck, Timer, Hourglass, BatteryFull, BatteryCharging,
  Thermometer, Wind, Cloud, Sun, Moon, Umbrella, Waves,
  Anchor, Ship, Truck, Forklift, HardHat, Hammer,
  Cpu, Monitor, Smartphone, Tablet, Laptop,
  Database, Server, CloudRain, Signal, Bluetooth,
  Volume2, VolumeX, Bell, BellOff, Bookmark, Tag, Tags,
  Home, Store, Factory, Warehouse, Building2, Castle, Church, Mosque,
  GraduationCap, Stethoscope, Pill, HeartPulse, Syringe, Bandage,
  DollarSign, TrendingUp, BarChart3, PieChart, Activity,
};

export function getIcon(name: string | undefined, className?: string): React.ReactNode {
  if (!name) return null;
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export const ICON_OPTIONS = Object.keys(iconMap).map((name) => ({
  value: name,
  label: name.replace(/([A-Z])/g, " $1").trim(),
}));
