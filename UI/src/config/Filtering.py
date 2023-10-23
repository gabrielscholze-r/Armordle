import re
import json
import sys
import traceback


def filter_items(data):
    filtered_data = {}
    for item_id, item_data in data.items():
        stats = item_data.get("stats", {})
        if item_data.get("requiredAlly", "") == "Ornn":
            continue
        if "FlatPhysicalDamageMod" in stats or "FlatMagicDamageMod" in stats or "FlatHPPoolMod" in stats \
            or "FlatArmorMod" in stats or "FlatSpellBlockMod" in stats or "FlatMovementSpeedMod" in  stats \
             or "PercentAttackSpeedMod" in stats or "FlatCritChanceMod" in stats or "PercentLifeStealMod" in stats:
            filtered_data[item_id] = item_data
    return filtered_data


def map_items(data):
    items_dict = {}
    for item_id, item_data in data.items():

        if len(item_id) > 4:
            continue

        name = item_data["name"]


        description = item_data["plaintext"]
        if len(description) == 0:
            description = item_data["description"]
        description = re.sub(r'<br>', ',', description)
        description = re.sub(r'<.*?>', ' ', description)
        description = re.sub(r'\s+', ' ', description)
        description = re.sub(r',+', ',', description)
        description = re.sub(r'\.,', '.', description)
        description = re.sub(r'\.+', '.', description)
        description = re.sub(r',$', '', description)

        description = description.strip()

        stats = [
            {"name": "Attack Damage", "value": item_data.get("stats", {}).get("FlatPhysicalDamageMod", 0)},
            {"name": "Ability Power", "value": item_data.get("stats", {}).get("FlatMagicDamageMod", 0)},
            {"name": "Life", "value": item_data.get("stats", {}).get("FlatHPPoolMod", 0)},
            {"name": "Armor", "value": item_data.get("stats", {}).get("FlatArmorMod", 0)},
            {"name": "Magic Resistance", "value": item_data.get("stats", {}).get("FlatSpellBlockMod", 0)},
            {"name": "Movement Speed", "value": item_data.get("stats", {}).get("FlatMovementSpeedMod", 0)},
            {"name": "Attack Speed", "value": int(item_data.get("stats", {}).get("PercentAttackSpeedMod", 0) * 100)},
            {"name": "Crit Chance", "value": int(item_data.get("stats", {}).get("FlatCritChanceMod", 0) * 100)},
            {"name": "Life Steal", "value": int(item_data.get("stats", {}).get("PercentLifeStealMod", 0) * 100)},
            {"name": "Gold", "value": item_data.get("gold", {}).get("total", 0)},
        ]

        item_dict = {
            "name": item_data["name"],
            "id": item_id,
            "into": item_data.get("into", []),
            "from": item_data.get("from", []),
            "image": {
                "sprite": item_data["image"]["sprite"],
                "x": item_data["image"]["x"],
                "y": item_data["image"]["y"],
                "w": item_data["image"]["w"],
                "h": item_data["image"]["h"],
            },
            "stats": stats,
            "description": description,
        }
        items_dict[name] = item_dict

    return list(items_dict.values())



def main():
    if len(sys.argv) != 3:
        print("Usage: python script.py input_file.json output_file.json")
        return

    input_filename = sys.argv[1]
    output_filename = sys.argv[2]

    try:
        with open(input_filename, 'r',encoding="utf-8") as input_file:
            input_data = json.load(input_file)

        data_to_process = input_data.get("data", {})  # Access the "data" key

        filtered_data = filter_items(data_to_process)
        mapped_items = map_items(filtered_data)

        with open(output_filename, 'w',encoding="utf-8") as output_file:
            json.dump(mapped_items, output_file, indent=4)

        print("Mapping successful. Output written to", output_filename)
    except Exception as e:
        print("Error:", e)
        print("Traceback:", traceback.format_exc())

if __name__ == "__main__":
    main()