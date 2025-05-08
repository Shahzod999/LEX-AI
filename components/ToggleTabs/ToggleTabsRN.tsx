import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";

interface TabsTypes {
  id: string;
  label: string;
  type: string;
}

interface TabsProps {
  tabs: TabsTypes[];
  onTabChange?: (tabId: string) => void;
  setOrderType?: (tabId: TabsTypes) => void;
  activeTab?: string; // Добавляем возможность управлять извне
}

const ToggleTabsRN: React.FC<TabsProps> = ({
  tabs,
  onTabChange,
  setOrderType,
  activeTab: externalActiveTab,
}) => {
  // Используем внешний activeTab если он передан, иначе внутреннее состояние
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0].id);
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  
  const [tabWidths, setTabWidths] = useState<{ [key: string]: number }>({});
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Используем useRef для сохранения анимации между рендерами
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab: TabsTypes) => {
    if (externalActiveTab === undefined) {
      // Если активная вкладка управляется внутри компонента
      setInternalActiveTab(tab.id);
    }
    setOrderType?.(tab);
    onTabChange?.(tab.id);
  };

  // Update animation when active tab changes
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let offset = 0;

    // Calculate the offset based on the tabs before the active one
    for (let i = 0; i < activeIndex; i++) {
      offset += tabWidths[tabs[i].id] || 0;
    }

    Animated.timing(slideAnim, {
      toValue: offset,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab, tabWidths, tabs]);

  // Measure the width of each tab
  const onTabLayout = (event: LayoutChangeEvent, tabId: string) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prev) => ({
      ...prev,
      [tabId]: width,
    }));
  };

  // Measure the width of the container
  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // Get the width of the active tab indicator
  const getIndicatorWidth = () => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    return tabWidths[tabs[activeIndex]?.id] || 0;
  };

  return (
    <View style={styles.tabsWrapper} onLayout={onContainerLayout}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onLayout={(e) => onTabLayout(e, tab.id)}
            onPress={() => handleTabChange(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Active tab indicator */}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              width: getIndicatorWidth(),
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    backgroundColor: "rgba(120, 120, 120, 0.2)",
    padding: 2,
    borderRadius: 10,
    width: "100%",
  },
  tabs: {
    flexDirection: "row",
    position: "relative",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 7,
    zIndex: 1,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.2,
    textAlign: "center",
    color: "#777777",
  },
  activeTabText: {
    color: "#000000",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    top: 0,
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 7,
  },
});

export default ToggleTabsRN;