import { useEffect, useState } from "react";
import { DropdownOptions } from "../types/DropdownOptions";
import { TaggedTimeURL } from "../types/TaggedTimeUrl";
import "./VisitedWebsitesList.scss";
import { updateWebsitesInStorage } from "../utils/UpdateWebsitesInStorage";
import DropdownWithConfirm from "./DropdownWithConfirm";
import { preprocessURL } from "../utils/PreprocessURL";

interface VisitedWebsitesListProps {
  visitedWebsites: TaggedTimeURL[];
  setVisitedWebsites: React.Dispatch<React.SetStateAction<TaggedTimeURL[]>>;
}

const websiteColor = ["grey", "orange", "blue", "red"];

export default function VisitedWebsitesList({
  visitedWebsites,
  setVisitedWebsites,
}: VisitedWebsitesListProps) {
  const dropdownOptions: DropdownOptions[] = [
    {
      id: "0",
      value: "Untagged",
    },
    {
      id: "1",
      value: "Productive",
    },
    {
      id: "2",
      value: "Unsure",
    },
    {
      id: "3",
      value: "Wasteful",
    },
  ];

  const [activeOption, setActiveOption] = useState<DropdownOptions[]>([]);

  const handleOptionSelect = (option: DropdownOptions, index: number) => {
    setActiveOption((prev) => {
      const newActiveOption = [...prev];
      newActiveOption[index] = option;
      return newActiveOption;
    });
  };

  useEffect(() => {
    const dropdownOptions: DropdownOptions[] = [
      {
        id: "0",
        value: "Untagged",
      },
      {
        id: "1",
        value: "Productive",
      },
      {
        id: "2",
        value: "Unsure",
      },
      {
        id: "3",
        value: "Wasteful",
      },
    ];
    const activeOption: DropdownOptions[] = [];
    for (let i = 0; i < visitedWebsites.length; i++) {
      activeOption.push(dropdownOptions[visitedWebsites[i].tag]);
    }
    setActiveOption(activeOption);
  }, [visitedWebsites]);

  const handleCancel = (index: number) => {
    setActiveOption((prev) => {
      const newActiveOption = [...prev];
      newActiveOption[index] = dropdownOptions[visitedWebsites[index].tag];
      return newActiveOption;
    });
  };

  const handleTagChange = (index: number) => {
    updateWebsitesInStorage([
      {
        id: visitedWebsites[index].label,
        website: visitedWebsites[index].label,
        tag: parseInt(activeOption[index].id),
      },
    ]);

    setVisitedWebsites((prev) => {
      const newWebsites = [...prev];
      newWebsites[index].tag = parseInt(activeOption[index].id);
      return newWebsites;
    });
    setActiveOption((prev) => {
      const newActiveOption = [...prev];
      newActiveOption[index] =
        dropdownOptions[parseInt(activeOption[index].id)];
      return newActiveOption;
    });
  };

  return (
    <div className="visited_website_list">
      <div className="visited_website_list__content">
        <div className="visited_website_list__content__title">
          <h3>Visited Websites</h3>
        </div>
        <div className="visited_website_list__content__list">
          {visitedWebsites.map((site, index) => {
            const website = preprocessURL(site.label);
            return (
              <div
                className="visited_website_list__content__list__item"
                key={index}
              >
                <div className="visited_website_list__content__list__item__website">
                  <div
                    className="visited_website_list__content__list__item__website__color"
                    id={websiteColor[site.tag]}
                  ></div>
                  {website.slice(0, 20) + (website.length > 20 ? "..." : "")}
                </div>
                <div className="visited_website_list__content__list__item__tag">
                  <DropdownWithConfirm
                    dropdownOptions={dropdownOptions}
                    activeOption={
                      activeOption[index] || { id: "0", value: "-1" }
                    }
                    setActiveOption={(option: DropdownOptions) => {
                      handleOptionSelect(option, index);
                    }}
                    handleCancel={() => {
                      handleCancel(index);
                    }}
                    handleTagChange={() => {
                      handleTagChange(index);
                    }}
                  ></DropdownWithConfirm>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}